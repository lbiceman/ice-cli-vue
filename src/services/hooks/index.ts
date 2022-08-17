import { ref, Ref } from "vue";

interface UseToggleResult {
	current: Ref<boolean>;
	positive: () => void;
	negative: () => void;
	toggle: () => void;
}
export function useToggle(state = false): UseToggleResult {
	const status = ref(state);
	const positive = () => {
		status.value = true;
	};
	const negative = () => {
		status.value = false;
	};
	const toggle = () => {
		status.value = !status.value;
	};
	return {
		current: status,
		positive,
		negative,
		toggle
	};
}
