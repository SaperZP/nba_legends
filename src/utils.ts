import {Player} from "./data.ts";

export const getCategories = (data: Player[]): string[] => {
  const categories = new Set<string>();

  data.forEach((player) => {
    player.statistics.forEach((stat) => {
      const filteredCategory = stat.replace(/[0-9,]/g, '').trim();
      categories.add(filteredCategory);
    });
  });

  return Array.from(categories);
};

export function findStatByCategory(player: Player, category: string) {
  return player.statistics.find((stat) => stat.includes(category))
}

export function commaToDotFloat(floatStr: string) {
  return parseFloat(floatStr.replace(',', '.'))
}
