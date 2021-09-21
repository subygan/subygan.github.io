import React, { Component } from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { config } from "../config/config.yml";

export const NavigationItem = props => (

        <Link href={props.data.link}>
            <a onClick={props.handleToggleNav}>{props.data.text}</a>
        </Link>

);


export default class Navigation extends Component {
    state = { navOpen: false };

    handleToggleNav = () => {
        this.props.toggleNavigation();
    };

    render() {
        // there is a click handler on div.backdrop to close the
        // nav if the user clicks outside of the navigation component
        return (
            <div>
                <div  className="backdrop" />

                    {config.navigation.map(navData => {
                        return (
                            <NavigationItem
                                key={navData.link}
                                data={navData}
                            />
                        );
                    })}
            </div>
        );
    }
}
