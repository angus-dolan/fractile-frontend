import { computed } from "vue";
import * as themeColors from "@/theme/LightTheme";
import * as DarkThemeColors from "@/theme/DarkTheme";
import { useCustomizerStore } from "@/stores/customizer";

export function customizer() {
  const cst = useCustomizerStore();
  return cst.actTheme;
}

const getPrimary = computed(() => {
  const custmizer = customizer();

  themeColors.DEFAULT_LIGHT_THEME.colors.primary;
});

const getLightPrimary = computed(() => {
  const custmizer = customizer();

  themeColors.DEFAULT_LIGHT_THEME.colors.lightprimary;
});

const getSecondary = computed(() => {
  const custmizer = customizer();

  themeColors.DEFAULT_LIGHT_THEME.colors.secondary;
});

const getLightSecondary = computed(() => {
  const custmizer = customizer();

  themeColors.DEFAULT_LIGHT_THEME.colors.lightsecondary;
});

const getLight100 = computed(() => {
  const custmizer = customizer();

  themeColors.DEFAULT_LIGHT_THEME.colors.grey100;
  themeColors.DEFAULT_LIGHT_THEME.colors.grey100;
});

export { getPrimary, getSecondary, getLightPrimary, getLightSecondary, getLight100 };
