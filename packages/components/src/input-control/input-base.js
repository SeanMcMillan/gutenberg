/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Backdrop from './backdrop';
import Label from './label';
import { Container, Root, Suffix } from './styles/input-control-styles';

function useUniqueId( idProp ) {
	const instanceId = useInstanceId( InputBase );
	const id = `input-base-control-${ instanceId }`;

	return idProp || id;
}

export function InputBase(
	{
		children,
		className,
		disabled = false,
		hideLabelFromVision = false,
		id: idProp,
		isFloatingLabel = false,
		isFilled = false,
		isFocused = false,
		label,
		size = 'default',
		suffix,
	},
	ref
) {
	const id = useUniqueId( idProp );

	const isFloating = isFloatingLabel ? isFilled || isFocused : false;
	const isFloatingLabelSet =
		! hideLabelFromVision && isFloatingLabel && label;

	return (
		<Root
			className={ className }
			isFloatingLabel={ isFloatingLabelSet }
			isFocused={ isFocused }
			ref={ ref }
		>
			<Label
				className="components-input-control__label"
				hideLabelFromVision={ hideLabelFromVision }
				htmlFor={ id }
				isFilled={ isFilled }
				isFloating={ isFloating }
				isFloatingLabel={ isFloatingLabel }
				size={ size }
			>
				{ label }
			</Label>
			<Container
				className="components-input-control__container"
				disabled={ disabled }
				isFocused={ isFocused }
			>
				{ children }
				{ suffix && (
					<Suffix className="components-input-control__suffix">
						{ suffix }
					</Suffix>
				) }
				<Backdrop
					aria-hidden="true"
					disabled={ disabled }
					isFloating={ isFloating }
					isFloatingLabel={ isFloatingLabelSet }
					isFocused={ isFocused }
					label={ label }
					size={ size }
				/>
			</Container>
		</Root>
	);
}

export default forwardRef( InputBase );
