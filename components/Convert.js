import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
	const [translated, setTranslated] = useState('');
	const [debounceText, setDebounceText] = useState(text);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebounceText(text);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [text]);

	useEffect(() => {
		const doTranslation = async () => {
			const { data } = await axios.post(
				'https://translation.googleapis.com/language/translate/v2',
				{},
				{
					params: {
						q: debounceText,
						target: language.value,
						key: 'API KEY',
					},
				}
			);
			setTranslated(data.data.translations[0].translatedText);
		};

		doTranslation();
	}, [language, debounceText]);

	return (
		<div>
			<h1 className="ui header">{translated}</h1>
		</div>
	);
};

export default Convert;
