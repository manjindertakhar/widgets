import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('React');
	const [debounceTerm, setDebounceTerm] = useState(term);
	const [results, setResults] = useState([]);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebounceTerm(term);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [term]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: debounceTerm,
				},
			});
			setResults(data.query.search);
		};
		if (debounceTerm) {
			search();
		}
	}, [debounceTerm]);

	const renderedResults = results.map((result) => {
		const snippet = result.snippet.replace(/(<([^>]+)>)/gi, '');

		return (
			<div key={result.pageid} className="item">
				<div className="right floated content">
					<a
						className="ui button"
						target="_blank"
						rel="noreferrer"
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
					>
						Go
					</a>
				</div>
				<div className="content">
					<div className="header">{result.title}</div>
					{snippet}
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className="ui form">
				<div className="feild">
					<label>Enter Search Term</label>
					<input
						className="input"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="ui celled list">{renderedResults}</div>
		</div>
	);
};

export default Search;
