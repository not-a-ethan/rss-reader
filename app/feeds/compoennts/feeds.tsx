import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

import styles from "../../../styles/feeds/feeds.module.css"

export function Feeds() {
    return (
        <>
            <Card className={`${styles.item}`}>
                <CardHeader>Feed Title</CardHeader>
                <CardBody>Veniam sunt ex id minim cillum pariatur enim deserunt commodo.</CardBody>
            </Card>

            <Card className={`${styles.item}`}>
                <CardHeader>Feed Title</CardHeader>
                <CardBody>Sit cillum ea minim occaecat fugiat reprehenderit sunt sint irure.</CardBody>
            </Card>
        </>
    )
}