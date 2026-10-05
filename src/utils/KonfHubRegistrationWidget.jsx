import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./KonfHubRegistrationWidget.css";

const BUTTON_ID = "btn_7754fd56d988";
const WIDGET_SCRIPT_URL = "https://widget.konfhub.com/widget.js";
const RegistrationContext = createContext(null);

export function KonfHubRegistrationProvider({ children }) {
  const launcherRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const launcher = launcherRef.current;
    if (!launcher) return undefined;

    const observer = new MutationObserver(() => {
      if (launcher.querySelector("button.reg-button")) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(launcher, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = false;
    script.setAttribute("button_id", BUTTON_ID);
    script.onerror = () => setLoadFailed(true);
    launcher.appendChild(script);

    return () => {
      observer.disconnect();
      script.onerror = null;
      script.remove();
    };
  }, []);

  const openRegistration = () => {
    const button = launcherRef.current?.querySelector("button.reg-button");
    if (button) {
      button.click();
    }
  };

  return (
    <RegistrationContext.Provider value={{ openRegistration, ready }}>
      {children}
      <div
        ref={launcherRef}
        className="konfhub-launcher"
        aria-hidden="true"
      />
      {loadFailed && (
        <p className="konfhub-widget-error" role="alert">
          Registration could not be loaded. Please refresh the page and try
          again.
        </p>
      )}
    </RegistrationContext.Provider>
  );
}

export default function KonfHubRegistrationWidget({
  className = "",
  children = "Register Now",
  onClick,
  ...buttonProps
}) {
  const registration = useContext(RegistrationContext);
  if (!registration) {
    throw new Error(
      "KonfHubRegistrationWidget must be rendered inside KonfHubRegistrationProvider.",
    );
  }

  const handleClick = (event) => {
    registration.openRegistration();
    onClick?.(event);
  };

  return (
    <button
      {...buttonProps}
      type="button"
      className={`konfhub-trigger ${className}`.trim()}
      onClick={handleClick}
      disabled={!registration.ready}
      aria-busy={!registration.ready}
    >
      {children}
    </button>
  );
}
