'use client';

import { useState } from "react";

import { Divider } from "@heroui/divider";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import {Input} from "@heroui/input";

import { Feeds } from "./compoennts/feeds";
import { Items } from "./compoennts/items";
import { Content } from "./compoennts/content";

import styles from "../../styles/aggregator.module.css"

export default function Aggregator() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [feed, setFeed] = useState(0);
    const [item, setItem] = useState([]);

    return (
        <>            
            <div className={`${styles.all}`}>
                <span className={`${styles.feeds}`}>
                    <Feeds onOpen={onOpen} feed={feed} setFeed={setFeed}  />
                </span>

                <Divider orientation="vertical" />

                <span className={`${styles.items}`}>
                    <Items item={item} setItem={setItem} />
                </span>

                <Divider orientation="vertical" />

                <span className={`${styles.content}`}>
                    <Content />
                </span>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>New RSS Feed</ModalHeader>

                    <ModalBody>
                        <Input label="Feed name" />

                        <Input label="Feed URL" />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                        </Button>

                        <Button color="primary" onPress={onClose}>
                        Add Feed
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}