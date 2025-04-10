package utils

func Map[T any, R any](input []T, format func(T) R) []R {
	output := make([]R, len(input))

	for index, value := range input {
		output[index] = format(value)
	}

	return output
}
