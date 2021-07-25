const Branch = ({ branch }) => {
    return branch.type === 'directory' ? <ul>{branch.children.map(child => <li><Branch branch={child} /></li>)}</ul> : branch.name;
};

export default Branch;
