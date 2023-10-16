import {
  InstantSearch,
  SearchBox as SearchBoxBase,
  useInstantSearch,
  Configure,
  useHits,
  Highlight,
} from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@/components/svg/SearchIcon";
import { debounce } from "src/utils/performance";
import { useRouter } from "next/router";

const searchClient = instantMeiliSearch(
  "https://search.fluke.com.ar",
  process.env.NEXT_PUBLIC_MEILISEARCH_TOKEN
);

const SearchBar = () => {
  return (
    <div className="group relative mt-1 w-full text-white transition-all duration-300 focus-within:w-full xl:mt-0 xl:w-80 xl:max-w-2xl 2xl:w-[500px]">
      <InstantSearch indexName="product" searchClient={searchClient}>
        <SearchBox />
        <EmptyQueryBoundary>
          <div className="absolute top-0 left-0 bottom-0 hidden items-center px-4 group-focus-within:flex">
            <SearchIcon className="h-4 w-4" />
          </div>
          <CustomHits />
        </EmptyQueryBoundary>
        <Configure filters="is_active = true" />
      </InstantSearch>
    </div>
  );
};

const SearchBox = () => {
  const { indexUiState } = useInstantSearch();

  return (
    <SearchBoxBase
      placeholder="Buscar productos o marcas"
      classNames={{
        form: "flex",
        input: `relative grow rounded-l-md border-0 border-solid border-l border-l-black border-l-solid peer pr-2 2xl:w-[500px] p-3 2xl:pl-6 focus:outline-none focus:pl-12 transition-all duration-300 ${
          indexUiState.query ? "rounded-r-md" : ""
        }`,
        reset: "hidden",
        submit:
          "bg-primary-600 rounded-r-md hidden px-5 pointer-events-none peer-placeholder-shown:flex items-center border-0",
        loadingIndicator: "hidden",
      }}
      submitIconComponent={SearchBarIcon}
    />
  );
};

const SearchBarIcon = () => {
  return <SearchIcon className="h-5 w-5" strokeWidth={1.5} />;
};

const saveSearch = debounce((searchString) => {
  fetch(`/api/save-search?s=${searchString}`);
}, 2000);

function CustomHits(props) {
  const { hits } = useHits(props);
  const { indexUiState } = useInstantSearch();
  const router = useRouter();

  useEffect(() => {
    saveSearch(indexUiState.query);
  }, [indexUiState.query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Enter" || document.activeElement.tagName !== "INPUT")
        return;

      router.push(`/busqueda?q=${encodeURI(indexUiState.query)}`);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, indexUiState.query]);

  return (
    <div className="absolute top-full right-0 left-0 hidden translate-y-[-6px] divide-y-2 divide-solid divide-slate-200 rounded-b-md border-slate-300 bg-white text-gray-800 shadow-md group-focus-within:block">
      <hr className="mb-0 mt-1 border-none" />
      {hits.slice(0, 6).map((hit) => (
        <Link href={`/producto/${hit.slug}`} key={hit.id}>
          <a
            className="block border-b-0 border-r-0 border-l-0"
            onClick={() => {
              document.activeElement.blur();
            }}
          >
            <article className="flex items-center py-2 px-4 xl:py-4">
              <SearchIcon className="hidden h-4 w-4 xl:block" stroke="#000" />
              <div className="mr-2 flex w-12 shrink-0 items-center xl:ml-4">
                {hit.crm_images[0] && (
                  <Image
                    src={hit.crm_images[0]}
                    width={64}
                    height={64}
                    alt={hit.title}
                  />
                )}
              </div>
              <h6 className="text-sm leading-none">
                <Highlight
                  highlightedTagName="b"
                  attribute="model_name"
                  hit={hit}
                />{" "}
                <br />{" "}
                <Highlight highlightedTagName="b" attribute="title" hit={hit} />
              </h6>
            </article>
          </a>
        </Link>
      ))}
    </div>
  );
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}

export default SearchBar;
