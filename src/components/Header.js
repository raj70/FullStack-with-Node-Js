import React from 'react';
import PropType from 'prop-types';

const Header = (props) => {
    return (
        <h2 className="Header text-center">
            {props.message}
        </h2>
    );
};

/* validation did not work */
Header.Proptypes = {
    headerMesssage: PropType.string.isRequired,
};

Header.defaultProps = {
    headerMesssage: "hello!"
};

export default Header;