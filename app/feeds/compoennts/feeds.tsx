import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

import styles from "../../../styles/feeds/feeds.module.css";
import pageStyles from "../../../styles/aggregator.module.css";

export function Feeds(props: any) {

    const activeFeed = props.feed;
    const setFeed = props.setFeed;

    function setFeedFunc(e: any) {
        const id = e.target.id;

        setFeed(id);
    }

    return (
        <>
            <Button isIconOnly className={`${pageStyles.action}`} onPress={props.onOpen}>+</Button>

            <Card className={`${styles.item} ${activeFeed == 0 ? styles.activeFeed : ""}`} id={"0"} onPressUp={setFeedFunc}>
                <div id={"0"} onClick={setFeedFunc}>
                    <CardHeader>
                        <h2 id={"0"} onClick={setFeedFunc}>All feeds</h2>
                    </CardHeader>
                </div>
            </Card>

            <Card className={`${styles.item} ${activeFeed == 1 ? styles.activeFeed : ""}`} id={"1"} onPressUp={setFeedFunc}>
                <div id={"1"} onClick={setFeedFunc}>
                    <CardHeader className={styles.cardHeader}>
                        <h2 id={"1"} onClick={setFeedFunc}>Feed Title</h2>
                    </CardHeader>
                </div>
                
                <div id={"1"} onClick={setFeedFunc}>
                    <CardBody>
                        <p id={"1"} onClick={setFeedFunc}>Sit cillum ea minim occaecat fugiat reprehenderit sunt sint irure.</p>
                    </CardBody>
                </div>    
            </Card>
        </>
    );
};