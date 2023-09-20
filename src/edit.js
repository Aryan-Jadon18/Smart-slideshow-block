import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

// Import your HTML content from the specified path
import indexHTML from 'html-loader!./my-website-files/index.html'; // Adjust the path as needed

export default function Edit() {
    return (
        <div { ...useBlockProps() }>
            {/* HTML content goes here */}
            <div>
                <header>
                    <h1>rtCamp's</h1>
                    <h3>Front end Assignment</h3>
                </header>
                <div class="container">
                    <img id="loader" src="itworks\my-website-files\loading.gif" alt="load" />
                    <div id="slideshow-container" class="slideshow-container">
                        {/* You can add content dynamically here */}
                    </div>
                    <form id="frm">
                        <input required id="newUrl" placeholder="New Website Url" type="url" />
                        <button type="submit">Change Website</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
