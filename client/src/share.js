import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

export default function Share() {
    //SERVER SIDE:
    // async function generateImage() {
    //     const browser = (await puppeteer).launch();
    //     const page = (await browser).newPage;

    //     await page.goto();
    //     await page.setViewport({ width: 500, height: 500 });
    //     await page.screenshot({ path: "./public" });
    //     await browser.close();
    // }

    return (
        <div>
            <p>Nice, now share this song with your pals!</p>
            <div className="socialButtons">
                <EmailShareButton url="aws" />
                <FacebookShareButton />
                <PinterestShareButton />
                <RedditShareButton />
                <TumblrShareButton />
                <TwitterShareButton />
                <WhatsappShareButton />
            </div>
        </div>
    );
}

//All
//children (string/element): React node
// url (string): URL of the shared page
