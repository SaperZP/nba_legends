import {Player} from "../../data.ts";
import styles from "./Card.module.scss"
import {useState} from "react";

type CardProps = {
  player: Player;
}

const Card = ({player}: CardProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
      <div
          onClick={() => setShowInfo((prev) => !prev)}
          className={styles.card}
      >
        <div className={styles.card_container}>
          <div
              className={styles.card_info}
              style={showInfo ? {zIndex: 1} : {zIndex: -1}}
          >
            <ul className={styles.card_list}>
              {player.statistics.map((stat) => <li key={stat} className={styles.card_listItem}>{stat}</li>)}
            </ul>
          </div>

          <img
              className={styles.card_img}
              src={player.img}
              alt={player.name}
              style={showInfo ? {zIndex: -1} : {zIndex: 1}}
          />
        </div>

        <div className={styles.card_bottom}>
          <p>{player.name}</p>
        </div>
      </div>
  )
};

export default Card;
