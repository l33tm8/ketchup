import React from "react";
import classes from "./Footer.module.css";
const Footer = () =>
{
    return (
        <footer>
		<div class={classes["footer-brand"]}>
			КЕТЧУП<sup>Ⓒ</sup>
		</div>
		<ul class={classes["footer-items"]}>
			<li><a href="#">About</a></li>
		</ul>
	</footer>
    )
}

export default Footer;