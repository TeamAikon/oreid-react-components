import React, { FunctionComponent, useMemo } from "react";
import providers from "../../assets/providers";

const defaultButtonStyle = {
  padding: "10px 10px 10px 10px",
  backgroundColor: "#3E5895",
  color: "#ffffff",
  fontFamily: "sans-serif",
  fontWeight: "500",
  fontSize: "14px",
  width: 200,
  lineHeight: "22px",
  letterSpacing: "1px",
  textAlign: "left",
  border: "none",
  borderRadius: "5px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
};

const defaultLogoStyle = {
  width: "18px",
  marginLeft: "10px",
  marginRight: "10px",
  verticalAlign: "text-bottom",
};

export const Providers = providers.map((provider) => provider.id);

export interface LoginProviderButtonProps {
  onClick: (event: React.MouseEvent, provider: string) => void;
  provider: string;
  text?: string;
  buttonStyle?: any;
  logoStyle?: any;
}

export const LoginProviderButton: FunctionComponent<LoginProviderButtonProps> = (props) => {
  const { provider } = props;

  const providerConfig = useMemo(() => {
    const metadata = providers.find((Provider) => Provider.id === provider);
    if (!metadata) {
      throw Error(`${provider} is not one of the supported providers. Use one of the following: ${providers.map((p) => p.id).join(", ")}`);
    }
    const buttonStyle = { ...defaultButtonStyle, ...(metadata.style.buttonStyle || {}), ...(props.buttonStyle || {}) };
    const logoStyle = { ...defaultLogoStyle, ...(metadata.style.logoStyle || {}), ...(props.logoStyle || {}) };
    const text = props.text || metadata.style.text;
    return {
      metadata,
      buttonStyle,
      logoStyle,
      text,
    };
  }, []);

  const dataAttributes = Object.keys(props).reduce((prev, curr) => (curr.startsWith("data-") ? { ...prev, [curr]: props[curr] } : prev), {});
  return (
    <div>
      <button
        style={providerConfig.buttonStyle}
        onClick={(e) => {
          props.onClick && props.onClick(e, provider);
        }}
        {...dataAttributes}
      >
        <img style={providerConfig.logoStyle} src={providerConfig.metadata.logo} alt={providerConfig.text} />
        <span>{providerConfig.text}</span>
      </button>
    </div>
  );
};

export default LoginProviderButton;
