export function Content(props: any) {
    const currentItem = props.currentItem;
    const articles = props.articles;

    const feedName = currentItem[0];
    const itemName = currentItem[1];
    const time = currentItem[2];

    const a: string | null = props.a;

    if (!a) {
        return (
            <>
                {a}
            </>
        );
    };

    let body;

    for (let i = 0; i < articles.length; i++) {
        const currentFeedName = articles[i]["feed"];
        const currentTitle = articles[i]["title"];
        const currentTime = articles[i]["time"];

        if (currentFeedName == feedName && currentTitle == itemName && currentTime == time) {
            body = articles[i]["content"];
            break;
        };
    };

    return (
        <>
            <h2>{itemName}</h2>

            <small>{time}</small>

            <p>{body}</p>
        </>
    );
};