import React from 'react';
import styles from "./users.module.css";
import {NavLink} from 'react-router-dom';


const Paginater = (props) => {
	const up = () => {
		props.linkUpCA();
		let downloadPage = (props.curentLinkPart + 1) * 10 + 1;
		props.switchPage(downloadPage, props.pageSize);
	};
	const down = () => {
		props.linkDownCA();
		let downloadPage = (props.curentLinkPart - 1) * 10 + 1;
		props.switchPage(downloadPage, props.pageSize)
	};

	let pages = [];

	for (let i = 1; i <= Math.ceil(props.totalCountUsers / props.pageSize); i++) {
		pages.push({id: i, numPage: i})
	}
	let pagesLinks = pages.map((p) => {
		let visible = p.id >= (props.curentLinkPart * 10) + 1 && p.id <= (props.curentLinkPart + 1) * 10;

		return (
			<span
				className={`${styles.link} ${p.id === props.curentPage ? styles.curentMarker : ''}`}
				key={p.id}
				onClick={() => props.switchPage(p.id, props.pageSize)}
				hidden={!visible}
			>
					{p.numPage}
				</span>
		)
	});
	let arrowUp = props.curentLinkPart < Math.floor(props.totalCountUsers / props.pageSize / 10) ?
		(<span className={styles.arrows} onClick={up}>{'>>'}</span>) :
		(<span/>);
	let arrowDown = props.curentLinkPart > 0 ?
		(<span className={styles.arrows} onClick={down}>{'<<'}</span>) :
		(<span/>);

	return (
		<div className={styles.container}>

			<div className={styles.countUsers}>Количество пользователей настранице
				<select
					className={styles.selectCountUsers}
					value={props.pageSize}
					onChange={(e) => props.changePage(e.target.value)}>
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
				</select>
			</div>
			{props.children}
			<div className={styles.links}>
				{arrowDown} {pagesLinks} {arrowUp}
			</div>

		</div>
	)
};

export default Paginater;