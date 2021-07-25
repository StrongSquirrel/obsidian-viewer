import MarkdownIt from 'markdown-it';
import wikilinks from '../markdown-it/wikilinks';

const md = MarkdownIt().use(wikilinks());

const NodeContent = ({ content }) => {
  return <div className="node-content-container" dangerouslySetInnerHTML={{ __html: md.render(content) }}></div>;
}

export default NodeContent;
