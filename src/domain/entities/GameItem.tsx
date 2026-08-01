export type GameItem = {
  id: string;
  title: string;
  description: string;
  baseFillRateMs: number;
  baseGain: number;
  // val baseUpgradeCost: Double,
  unlockAmount?: number;
  // val upgradeMultipliers: UpgradeMultipliers,

  // UpgradeMultipliers:
  /* val costMultiplier: Double,
        val fillRateMultiplier: Double,
        val gainMultiplier: Double, */
};
