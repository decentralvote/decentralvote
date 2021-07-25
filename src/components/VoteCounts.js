import { ethers } from 'ethers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function VoteCounts(props) {
    let counts = props.counts;
    let proposals = props.proposals;
    let items = counts.map((count, index) => {
        let label = `${ethers.utils.parseBytes32String(proposals[index])}`;
        let votes = `Votes: ${count.toString()}`;
        return <ListItemLink>
            <ListItemText primary={label} secondary={votes} />
        </ListItemLink>
    });
    return <div>
        <Typography component="h1" variant="h5">
            Results
        </Typography>
        <List component="nav" aria-label="secondary mailbox folders">
            {items}
        </List>
    </div>
}

export default VoteCounts;