import { ethers } from 'ethers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from "@material-ui/core/styles";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  results: {
    marginBottom: 0,
  }
}));

function VoteCounts(props) {
    let counts = props.instance.voterCounts;
    let proposals = props.instance.proposals;

    const classes = useStyles();

    let items = counts.map((count, index) => {
        let label = `${ethers.utils.parseBytes32String(proposals[index])}`;
        let votes = `Votes: ${count.toString()}`;
        return <ListItemLink key={index.toString()}>
            <ListItemText primary={label} secondary={votes}/>
        </ListItemLink>

    });
    return <div>
            <h2 className={classes.results}>
                Results
            </h2>
            <List component="nav" aria-label="secondary mailbox folders">
                {items}
            </List>
          </div>
}

export default VoteCounts;
