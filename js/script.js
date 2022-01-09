const filterByType = (type, ...values) => values.filter((value) => typeof value === type),
	/* Объявлена функция filterByType с двумя аргументами type (значение select) и массивом ...values , который возращает отфильтованный по типу данных массив */

	hideAllResponseBlocks = () => {
		/* Объявлена функция, которая скрывает все поля с результатом */
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем массив с верстки
		responseBlocksArray.forEach((block) => (block.style.display = 'none'));
	}, // делаем все блоки невидимыми
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		/* Объявлена функция, которая показывает необходимый блок результатов */
		hideAllResponseBlocks(); // скрываем все блоки
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		} // если есть span с таким идентификатором, то отображаем msgText
	},
	showError = (msgText) => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // Объявлена ф-ия showError(msgText), которая передает в функцию showResponseBlock() текст об ошибке msgText и идентификатор span '#error'
	showResults = (msgText) => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // Объявлена ф-ия showResults(msgText), которая передаем в функцию showResponseBlock() текст msgText и идентификатор span '#ok'
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // Объявлена ф-ия sshowNoResults()  не отображаем никакой результат (Сообщение "Пока что нечего показать")
	tryFilterByType = (type, values) => {
		/* Объявлена функция tryFilterByType с двумя аргументами */
		try {
			// Блок try / catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(', ');
			//  Объявление const valuesArray, которая принимает значение результат вызова метода eval (возвращает значение выполнения кода, переданного в виде строки, т.е. резлультат выполнения функции filterByType() с двумя аргуемнтами type (значение select) и values (значение input) - Массиву отффильтрованных значений ). А также применяется метод join(), который делает из массива строку.

			const alertMsg = valuesArray.length ? `Данные с типом ${type}: ${valuesArray}` : `Отсутствуют данные типа ${type}`; // Объявление const valuesArray. Если строка (из массива) не пуста, то  valuesArray приниает значение: `Данные с типом ${type (значение select) }: ${valuesArray (значение input)}`, иначе `Отсутствуют данные типа ${type}`
			showResults(alertMsg); // показывает блок (span с id '#ok') c полученным выше текстом
		} catch (e) {
			showError(`Ошибка: ${e}`); // показыавет блок-ошибку с текстом
		}
	};

const filterButton = document.querySelector('#filter-btn'); // кнопка "Фильтровать"

filterButton.addEventListener('click', (e) => {
	const typeInput = document.querySelector('#type'); // Получаем select: number/string/boolean
	const dataInput = document.querySelector('#data'); // Получаем input c данными

	if (dataInput.value === '') {
		// если мы не заполнили input
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // показывает кастомное тревожное сообщение
		showNoResults(); //В поле результатов показывает сообщение "Пока что нечего показать"
	} else {
		dataInput.setCustomValidity(''); // очищает кастомное  тревожное сообщение
		e.preventDefault(); // отменяет поведение кнопки по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // запускает функцию tryFilterByType() и в качестве аргументов передает очищенные от пробелов в начале и конце значения select и input
	}
});
