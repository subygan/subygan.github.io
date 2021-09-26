import React from "react";
import { config } from "../config/config.yml";

export default function Footer() {
    return (
        <div class="page-footer">
            <div class="line"></div>
            <div class="social">
                <div class="social__icon">
                    <a href="https://github.com/suriya-ganesh/" title="github"><i class="fab fa-github"></i></a>
                </div>
                <div class="social__icon">
                    <a href="mailto:suriyaganesh097@gmail.com" title="email"><i class="fas fa-envelope"></i></a>
                </div>
                <div class="social__icon">
                    <a href="https://t.me/SuriyaGanesh" title="telegram"><i class="fab fa-telegram"></i></a>
                </div>
            </div>
        </div>

    );
}
