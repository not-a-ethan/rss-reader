import { Divider } from "@heroui/divider";

import { Feeds } from "./compoennts/feeds";
import { Items } from "./compoennts/items";
import { Content } from "./compoennts/content";

import styles from "../../styles/aggregator.module.css"

export default function Aggregator() {
    return (
        <>
            <br />
            
            <div className={`${styles.all}`}>
                <span className={`${styles.feeds}`}>
                    <Feeds  />
                </span>

                <Divider orientation="vertical" />

                <span className={`${styles.items}`}>
                    <Items />
                </span>

                <Divider orientation="vertical" />

                <span className={`${styles.content}`}>
                    <Content />
                </span>
            </div>
        </>
    )
}