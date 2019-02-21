export function areEqual(obj1 : any, obj2 : any) {
	return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
};