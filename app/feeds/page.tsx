'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Divider } from "@heroui/divider";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import {Input} from "@heroui/input";

import { Feeds } from "./compoennts/feeds";
import { Items } from "./compoennts/items";
import { Content } from "./compoennts/content";

import { getAPI } from "@/helpers/getAPI";

import styles from "../../styles/aggregator.module.css";

export default function Aggregator() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [activeFeed, setActiveFeed] = useState(0);
    const [currentItem, setCurrentItem] = useState([]);
    const [articles, setArticles] = useState([
        {
            feed: "Feed Title",
            title: "Article Title",
            content: "Culpa proident magna tempor enim duis enim esse excepteur commodo. Non fugiat do irure incididunt consectetur Lorem est id nulla.",
            time: "Some time ago"
        },
        {
            feed: "Feed Title",
            title: "Another article Title",
            content: "Aliqua id reprehenderit reprehenderit adipisicing sit minim ipsum eiusmod quis. Officia sit non officia excepteur occaecat est cupidatat nisi mollit.",
            time: "Some time ago"
        }
    ]);

    const { data: session, status } = useSession();
    const router = useRouter();

    const { rssItems, rssError, rssLoading } = getAPI(`../api/rss?url=${"https://sample-feeds.rowanmanning.com/examples/23f07db95d2d9a8b422a186600eae22c/feed.xml"}`, ["rssItems", "rssError", "rssLoading"]);

    if (rssItems) {
        const parser = new DOMParser();
        const stuff = parser.parseFromString(rssItems["xml"], "text/xml");

        // stuff is the rss items feed

        return (
            <>            
                <div className={`${styles.all}`}>
                    <span className={`${styles.feeds}`}>
                        <Feeds onOpen={onOpen} activeFeed={activeFeed} setActiveFeed={setActiveFeed}  />
                    </span>

                    <Divider orientation="vertical" />

                    <span className={`${styles.items}`}>
                        <Items currentItem={currentItem} setCurrentItem={setCurrentItem} />
                    </span>

                    <Divider orientation="vertical" />

                    <span className={`${styles.content}`}>
                        <Content currentItem={currentItem} articles={articles} a={stuff} />
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
        );
    };

    if (status === "loading") {
        return (
            <p>Loading...</p>
        );
    };

    if (status === "unauthenticated") {
        router.replace("/api/auth/signin");
        return (
            <p>403 | Login in to see this page</p>
        );
    };

    return (
        <>            
            <div className={`${styles.all}`}>
                <span className={`${styles.feeds}`}>
                    <Feeds onOpen={onOpen} activeFeed={activeFeed} setActiveFeed={setActiveFeed}  />
                </span>

                <Divider orientation="vertical" />

                <span className={`${styles.items}`}>
                    <Items currentItem={currentItem} setCurrentItem={setCurrentItem} />
                </span>

                <Divider orientation="vertical" />

                <span className={`${styles.content}`}>
                    <Content currentItem={currentItem} articles={articles} />
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
    );
};