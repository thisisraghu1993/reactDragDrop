import React,{Fragment} from 'react';
const Header = (props) => {
    return (
        <Fragment>
               <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">

<span className="navbar-toggler-icon"></span>

</button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            <a className="navbar-brand" href="#">Drag& Drop</a>
            
        </div>

    </nav>
    
</Fragment>
    );
};
export default Header;