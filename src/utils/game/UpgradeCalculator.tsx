import { GameItem } from "@/domain/entities/GameItem";
import { UpgradeMultipliers } from "@/domain/entities/UpgradeMultipliers";

export namespace UpgradeCalculator {
  /**
   * @param base Item's {@link GameItem.baseUpgradeCost base upgrade cost}.
   * @param multiplier Upgrade's {@link UpgradeMultipliers.costMultiplier cost multiplier}.
   * @param level The level of the item after the upgrade.
   */
  export function calculateCost(base: number, multiplier: number, level: number): number {
    const roundingFactor = getRoundingFactor(base);
    return Math.floor(Math.round(base * Math.pow(multiplier, level - 1)) / roundingFactor) * roundingFactor;
  }

  /**
   * @param baseMs Item's {@link GameItem.baseFillRateMs base fill rate} in milliseconds.
   * @param multiplier Upgrade's {@link UpgradeMultipliers.fillRateMultiplier fill rate multiplier}.
   * @param level The level of the item after the upgrade.
   */
  export function calculateFillRate(baseMs: number, multiplier: number, level: number): number {
    return Math.max(100, baseMs * Math.pow(multiplier, 1 - level));
  }

  /**
   * @param base Item's {@link GameItem.baseGain base gain}.
   * @param multiplier Upgrade's {@link UpgradeMultipliers.gainMultiplier gain multiplier}.
   * @param level The level of the item after the upgrade.
   */
  export function calculateGain(base: number, multiplier: number, level: number): number {
    const roundingFactor = getRoundingFactor(base);
    return Math.floor(Math.round(base * Math.pow(multiplier, level - 1)) / roundingFactor) * roundingFactor;
  }

  function getRoundingFactor(base: number): number {
    if (base < 20.0) {
      return 1;
    }
    if (base < 50.0) {
      return 5;
    }
    return 10;
  }
}
