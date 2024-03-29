export type ThemeTypes = {
  name: string;
  dark: boolean;
  variables?: object;
  colors: {
    primary?: string;
    secondary?: string;
    info?: string;
    success?: string;
    accent?: string;
    warning?: string;
    error?: string;
    lightprimary?: string;
    lightsecondary?: string;
    lightsuccess?: string;
    lighterror?: string;
    lightinfo?: string;
    lightwarning?: string;
    textPrimary?: string;
    textSecondary?: string;
    borderColor?: string;
    hoverColor?: string;
    inputBorder?: string;
    containerBg?: string;
    background?: string;
    surface?: string;
    "on-surface-variant"?: string;
    grey100?: string;
    grey200?: string;
    // vuetify purple
    purple: string;
    "purple-lighten-5": string;
    "purple-lighten-4": string;
    "purple-lighten-3": string;
    "purple-lighten-2": string;
    "purple-lighten-1": string;
    "purple-darken-1": string;
    "purple-darken-2": string;
    "purple-darken-3": string;
    "purple-darken-4": string;
    "purple-accent-1": string;
    "purple-accent-2": string;
    "purple-accent-3": string;
    "purple-accent-4": string;
  };
};
