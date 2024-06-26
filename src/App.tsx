import styles from './App.module.scss';
import {data, Player} from "./data.ts";
import {useEffect, useState} from "react";
import {commaToDotFloat, findStatByCategory, getCategories} from "./utils.ts";
import Card from "./components/Card/Card.tsx";

function App() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [dataToDisplay, setDataToDisplay] = useState<Player[]>([]);

  useEffect(() => {
    const resolvedCategories = getCategories(data);

    setCategories(resolvedCategories);
    setActiveCategory(resolvedCategories[0]);
  }, [])

  useEffect(() => {
    const filterByName = name
        ? data.filter((player) => player.name.toLowerCase().includes(name.toLowerCase()))
        : data;
    const dataToDisplay = filterByName.sort((player1, player2) => {
      const toCompare1 = findStatByCategory(player1, activeCategory);
      const toCompare2 = findStatByCategory(player2, activeCategory);

      if (toCompare1 && toCompare2) {
        return commaToDotFloat(toCompare2) - commaToDotFloat(toCompare1);
      }

      return 0;
    });

    setDataToDisplay(dataToDisplay);

  }, [name, activeCategory]);

  console.log(dataToDisplay)

  return (
      <>
        <header className={styles.header}>
          <img src="/src/assets/nba-logo.png" alt="nba logo"/>
          <h1 className={styles.header_title}>NBA Legends</h1>
        </header>

        <main className={styles.main}>
          <section className={styles.search}>
            <input onChange={(event) => setName(event.target.value)}
                   className={styles.search_searchBar}
                   placeholder="Search player" type="text"
            />

            <select
                className={styles.search_searchBar}
                name="sortByCategory"
                id="sortByCategory"
                onChange={(event) => setActiveCategory(event.target.value)}
            >
              {categories.map(category => (
                  <option key={category} value={category}>{category[0].toUpperCase() + category.slice(1)}</option>
              ))}
            </select>
          </section>
          <section className={styles.cards}>
            {dataToDisplay.map((player) => (<Card key={player.name} player={player}/>))}
          </section>
        </main>
      </>
  )
}

export default App
