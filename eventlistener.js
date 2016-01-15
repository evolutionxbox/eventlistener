/**
 * EventListener Class
 * This class gives an easy way to manage event listeners,
 * and removes the need for 'scoped function' variables.
 */
export default class EventListener {
	/**
	 * Create an EventListener
	 *
	 * @param  {string} type - a string of an event type, such as "click".
	 * @param  {Element} targetEl - the HTMLElement to which the HTMLEvent will attach to.
	 * @param  {Function} callback() - a function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
	 * @returns {EventListener}
	 *
	 * @example
	 * // normal
	 * var myEventName = new HsbcUi.EventListener('click', <targetHTMLElement>, callbackFunction);
	 * myEventName.attach();
	 *
	 * //scoped callback
	 * var myEventName = new HsbcUi.EventListener('click', <targetHTMLElement>, myObject.callbackFunction.bind(myObject));
	 * myEventName.attach();
	 */
	constructor(type, targetEl, callback) {

		// Error checks!
		if (!(typeof type === 'string' && type !== '')) {
			throw new TypeError(this.constructor.name + ': `type` must be of type string and not be empty');
		}

		if (!(targetEl && targetEl.nodeType && targetEl.nodeType === 1)) {
			throw new TypeError(this.constructor.name + ': `targetEl` must be of type HTMLELement');
		}

		if (callback !== false) {
			if (!(callback && typeof callback === 'function')) {
				throw new TypeError(this.constructor.name + ': `targetEl` must be a function');
			}
		}

		this._type = type;
		this._targetEl = targetEl;
		this._callback = callback || function returnFalse() { return false; };
		this._attached = false;
	}

	/**
	 * returns attached property
	 *
	 * @example
	 * var isAttached = myEventName.attached;
	 *
	 * @public
	 * @returns {Boolean}
	 */
	get attached() {
		return this._attached;
	}

	/**
	 * attach runs the native addEventListener function
	 * using `this._type`, `this._targetEl`, `this._callback`
	 *
	 * @example
	 * myEventName.attach();
	 *
	 * @public
	 */
	attach() {
		this._targetEl.addEventListener(this._type, this._callback);
		this._attached = true;
	}

	/**
	 * detach runs the native removeEventListener function
	 * using `this._type`, `this._targetEl`, `this._callback`
	 *
	 * @example
	 * myEventName.detach();
	 *
	 * @public
	 */
	detach() {
		this._targetEl.removeEventListener(this._type, this._callback);
		this._attached = false;
	}

	/**
	 * Destroy the instance of EventListener
	 *
	 * @example
	 * myEventName.destroy();
	 *
	 * @public
	 */
	destroy() {

		// Detach the EventListener
		this.detach();

		// Delete all object properties
		let prop;

		for (prop in this) {
			if ( prop !== 'destroy') {
				delete this[prop];
			}
		}

		delete this.destroy;
	}
}