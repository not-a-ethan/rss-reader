import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

import pageStyles from "../../../styles/aggregator.module.css";
import styles from "../../../styles/feeds/items.module.css"

export function Items(props: any) {
    const currentItem: string[] = props.currentItem;
    const setCurrentItem = props.setCurrentItem;

    function selectItem(e: any) {
        const id = e.target.id;
        //Feed name, Item Name, Time
        const parts = id.split("-");

        setCurrentItem(parts);
    }

    return (
        <>
            <Button isIconOnly className={`${pageStyles.action}`}>↻</Button>
            <Button isIconOnly className={`${pageStyles.action}`}>✉️</Button>

            <Card className={`${styles.item} ${currentItem.join("-") == "Feed Title-Article Title-Some time ago"  ? styles.activeItem : ""}`} onPressUp={selectItem} id="Feed Title-Article Title-Some time ago" >
                <CardHeader className={`${styles.cardHeader}`}>
                    <h2 onClick={selectItem} id={"Feed Title-Article Title-Some time ago" }>Article Title</h2>
                </CardHeader>

                <CardBody>
                    <p onClick={selectItem} id={"Feed Title-Article Title-Some time ago" }>Culpa proident magna tempor enim duis enim esse excepteur commodo. Non fugiat do irure incididunt consectetur Lorem est id nulla.</p>
                </CardBody>

                <CardFooter>
                    <span onClick={selectItem} id={"Feed Title-Article Title-Some time ago" }>Some time ago</span>
                </CardFooter>
            </Card>

            <Card className={`${styles.item} ${currentItem.join("-") == "Feed Title-Another article Title-Some time ago"  ? styles.activeItem : ""}`} onPressUp={selectItem} id="Feed Title-Another article Title-Some time ago">
                <CardHeader className={`${styles.cardHeader}`}>
                    <h2 onClick={selectItem} id="Feed Title-Another article Title-Some time ago">Another article Title</h2>
                </CardHeader>

                <CardBody>
                    <p onClick={selectItem} id="Feed Title-Another article Title-Some time ago">Aliqua id reprehenderit reprehenderit adipisicing sit minim ipsum eiusmod quis. Officia sit non officia excepteur occaecat est cupidatat nisi mollit.</p>
                </CardBody>

                <CardFooter>
                    <span onClick={selectItem} id="Feed Title-Another article Title-Some time ago">Some time ago</span>
                </CardFooter>
            </Card>
        </>
    );
};