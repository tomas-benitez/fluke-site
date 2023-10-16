import { Fragment } from "react";

const ResourcesList = ({ resources }) => {
  const resourceTypesMap = resources.reduce((acc, resource) => {
    if (!acc.has(resource.type.identifier)) {
      acc.set(resource.type.identifier, {
        ...resource.type,
        resources: [],
      });
    }
    acc.get(resource.type.identifier).resources.push(resource);
    return acc;
  }, new Map());

  return (
    <div>
      {Array.from(resourceTypesMap.entries()).map(([identifier, type]) => (
        <Fragment key={identifier}>
          <h6>{type.label}</h6>
          <ul className="list-none pl-4 text-blue-500">
            {type.resources.map((resource) => (
              <li key={resource.id}>
                <a
                  href={resource.url}
                  className="flex items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.name.replace(`[${identifier}]`, "")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};

export default ResourcesList;
