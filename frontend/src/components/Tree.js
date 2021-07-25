import Branch from './Branch';

const Tree = ({ branches }) => {
    return (
        <div className="tree-container">
            <ul>
                {branches.map(branch => <li><Branch branch={branch} /></li>)}
            </ul>
        </div>
    );
};

export default Tree;
