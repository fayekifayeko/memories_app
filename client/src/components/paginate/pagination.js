import { Pagination, PaginationItem } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Paginate = () => {

    const classes = useStyles();
    return (
        <Pagination
        classes={{ul: classes.ul}}
        count={5}
        page={1}
        renderItem={(props) => (
            <PaginationItem {...props} component={Link} to={`/posts?page=${1}`}/>
        )}
        variant="outlined"
        color="primary"
        />
    );
}

export default Paginate;