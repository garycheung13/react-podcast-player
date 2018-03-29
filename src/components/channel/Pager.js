import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/fontawesome-free-solid';

const Pager = ({ pager, handlePager }) => {
    return (
        <div className="pager">
            <button disabled={pager.page === 1} onClick={() => { handlePager(pager.page - 1) }}>
                <FontAwesomeIcon icon={faAngleLeft} size="2x" className="pager-arrow"/>
            </button>
            <div>
                {pager.page} of {pager.totalPages}
            </div>
            <button disabled={pager.page === pager.totalPages} onClick={() => { handlePager(pager.page + 1) }}>
                <FontAwesomeIcon icon={faAngleRight} size="2x" className="pager-arrow"/>
            </button>
        </div>
    );
};

Pager.propTypes = {
    pager: PropTypes.object.isRequired,
    handlePager: PropTypes.func.isRequired,
};

export default Pager;