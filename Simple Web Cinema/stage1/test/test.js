import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - check nav, title and login elements
        this.page.execute(() => {
            let navElements = document.getElementsByClassName('nav');
            let orgElements = document.getElementsByClassName('Org__Title');
            let logElements = document.getElementsByClassName('Log');

            if (navElements.length === 0 && orgElements.length === 0 && logElements.length === 0) {
                return wrong(`Cannot find element with class 'nav', 'Org__Title' and 'Log`);
            } else if (navElements.length > 1) {
                return wrong(`Found ${navElements.length} elements with class 'nav'` +
                    `, the page should contain just a single such element.`);
            }

            return correct()
        }),
        // Test 2 - check main-container, box and video-container elements
        this.page.execute(() => {
            let containerElements = document.getElementsByClassName('main__container');
            let boxElements = document.getElementsByClassName('box');
            let videoContainerElements = document.getElementsByClassName('video-container');

            if (containerElements.length === 0 && boxElements.length === 0 && videoContainerElements.length === 0) {
                return wrong(`Cannot find element with class 'main__container', 'box' and 'video-container`);
            } else if (containerElements > 1) {
                return wrong(`Found ${containerElements.length} elements with class 'nav'` +
                    `, the page should contain just a single such element.`);
            }

            return correct()
        }),
        // Test 3 - check body background color
        this.page.execute(() => {
            const bodyBackground = window.getComputedStyle(document.body).backgroundColor;

            if (bodyBackground !== 'rgb(242, 235, 255)') {
                return wrong(`Wrong body background color, correct color is rgb(242, 235, 255), now - ${bodyBackground}`)
            } else
                return correct()
        })
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
