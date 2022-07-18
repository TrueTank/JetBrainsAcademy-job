import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            let navElements = document.getElementsByClassName('nav');  
            let orgElements = document.getElementsByClassName('Org__Title'); 
            let logElements = document.getElementsByClassName('Log'); 
            
            if (navElements.length === 0 && orgElements === 0 && logElements === 0) {
                return wrong(`Cannot find element with class 'nav', 'Org__Title' and 'Log`);
            } else if (navElements > 1) {
                return wrong(`Found ${navElements.length} elements with class 'nav'` +
                    `, the page should contain just a single such element.`);
            }       

            return correct()
        }),
        this.page.execute(() => {
            let containerElements = document.getElementsByClassName('main__container');  
            let boxElements = document.getElementsByClassName('box'); 
            let videocontainerlements = document.getElementsByClassName('video-container'); 
            
            if (containerElements === 0 && boxElements === 0 && videocontainerlements === 0) {
                return wrong(`Cannot find element with class 'main__container', 'box' and 'video-container`);
            } else if (containerElements > 1) {
                return wrong(`Found ${containerElements.length} elements with class 'nav'` +
                    `, the page should contain just a single such element.`);
            }       

            return correct()
        }),
        this.page.execute(() => {
            const bodyStyles = await body.getStyles()

            if (bodyStyles.backgroundColor !== '#f2ebff') {
                return wrong('wrong backgroundColor')
            } else 
                return correct()
        })
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);