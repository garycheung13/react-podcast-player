import React from 'react';
import PropTypes from 'prop-types';

const Pager = ({ pager, handlePager }) => {
    return (
        <div className="pager">
            <button disabled={pager.page === 1} onClick={() => { handlePager(pager.page - 1) }}>Previous Page</button>
            <div>
                {pager.page} of {pager.totalPages}
            </div>
            <button disabled={pager.page === pager.totalPages} onClick={() => { handlePager(pager.page + 1) }}>Next Page</button>
        </div>
    );
};

Pager.propTypes = {
    pager: PropTypes.object.isRequired,
    handlePager: PropTypes.func.isRequired,
};

export default Pager;