import { UpgradeMultipliers } from "./UpgradeMultipliers";

export type GameItem = {
  id: string;
  title: string;
  description: string;
  baseFillRateMs: number;
  baseGain: number;
  baseUpgradeCost: number;
  unlockAmount?: number;
  upgradeMultipliers: UpgradeMultipliers;
};
