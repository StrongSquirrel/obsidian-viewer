const express = require('express');
const dirTree = require('directory-tree');
const cors = require('cors');

const app = express();
const port = 3000;

const EXCLUDE = process.env.EXCLUDE || /\.git|\.obsidian|attachments/;
const DOCS_FOLDER = process.env.DOCS_FOLDER;

if (!DOCS_FOLDER) {
  throw new Error('DOCS_FOLDER is must set');
}

app.use(cors());
app.use('/docs', express.static(DOCS_FOLDER));

function walk(branches) {
  return branches.map(b => {
    const item = {
      path: b.path.replace(DOCS_FOLDER, '').replace(/^\//, ''),
      name: b.name,
      type: b.type,
    }

    if (item.type === 'directory') {
      item.children = walk(b.children);
    }

    return item;
  })
}

app.get('/', (req, res) => {
  const tree = dirTree(DOCS_FOLDER, {
    extensions: /\.md/,
    exclude: EXCLUDE,
  });
  res.json(walk(tree.children));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
