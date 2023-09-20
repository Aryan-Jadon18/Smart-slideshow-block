import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <script src="itworks\my-website-files\touch.js"></script>
            <header>
                <h1>rtCamp's</h1>
                <h3>Front end Assignment</h3>
            </header>
            <div class="container">
                <img id="loader" src="itworks\my-website-files\loading.gif" alt="load" />
                <div id="slideshow-container" class="slideshow-container">
                </div>
                <form id="frm">
                    <input required id="newUrl" placeholder="New Website Url" type="url" />
                    <button type="submit">Change Website</button>
                </form>
            </div>
            <script src="itworks\my-website-files\main.js"></script>
        </div>
    );
}
