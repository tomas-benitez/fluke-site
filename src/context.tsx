import { createContext, SetStateAction, useContext, useState } from "react";

type ContactPopupState = {
  visible: boolean;
  message?: string;
};

const AppContext = createContext({
  contactPopupState: {
    visible: false,
  },
  setContactPopupState: (state: SetStateAction<ContactPopupState>) => {},
  newsletterPopupVisible: false,
  setNewsletterPopupVisible: (visible: boolean) => {},
});

export function AppContextProvider({ children }) {
  const [contactPopupState, setContactPopupState] = useState<ContactPopupState>(
    {
      visible: false,
    }
  );
  const [newsletterPopupVisible, setNewsletterPopupVisible] = useState(false);

  let sharedState: ReturnType<typeof useAppContext> = {
    contactPopupState,
    setContactPopupState,
    newsletterPopupVisible,
    setNewsletterPopupVisible,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
