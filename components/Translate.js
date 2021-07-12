import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const tranlateOptions = [
	{
		label: 'Afrikaans',
		value: 'af',
	},
	{
		label: 'Arabic',
		value: 'ar',
	},
	{
		label: 'Hindi',
		value: 'hi',
	},
];

const Translate = () => {
	const [language, setLanguage] = useState(tranlateOptions[0]);
	const [text, setText] = useState('');

	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label>Enter Text</label>
					<input value={text} onChange={(e) => setText(e.target.value)} />
				</div>
			</div>

			<Dropdown
				label="Select a Language"
				selected={language}
				onSelectedChange={setLanguage}
				options={tranlateOptions}
			/>
			<hr />
			<h3 className="ui header">Output</h3>
			<Convert language={language} text={text} />
		</div>
	);
};

export default Translate;
