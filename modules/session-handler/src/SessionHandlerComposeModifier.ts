import { createModifier, type ModifierConfig } from '@expo/ui/jetpack-compose/modifiers';

export const sessionHandlerComposeModifier = (params: {
  color?: number;
  width?: number;
  cornerRadius?: number;
}): ModifierConfig => createModifier('sessionHandlerComposeModifier', params);
