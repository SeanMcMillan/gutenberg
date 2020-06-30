/**
 * WordPress dependencies
 */
import {
	ToolbarButton,
	ToolbarGroup,
	ToolbarOverlay,
	__experimentalToolbarItem as ToolbarItem,
} from '@wordpress/components';
import { external as externalIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 *
 * @param url
 */
/**
 * Internal dependencies
 */
import SuggestionsPopover from './suggestions-popover';

export default function LinkToolbarOverlay( {
	url,
	displayUrl = url,
	label,
	opensInNewTab,
	isOpen,
	setOpen,
	onChange,
} ) {
	const [ editUrl, setEditUrl ] = useState( displayUrl );

	const inputRef = useRef();

	useEffect( () => {
		if ( isOpen ) {
			setEditUrl( displayUrl );
			// @TODO: This function steals focus from the popover.
			//        Let's make sure the popover isn't getting focused in the first place
			// eslint-disable-next-line @wordpress/react-no-unsafe-timeout
			setTimeout( () => {
				if ( inputRef.current ) {
					inputRef.current.focus();
				}
			}, 100 );
		}
	}, [ isOpen ] );

	const finishLinkEditing = ( acceptChanges = true ) => {
		if ( acceptChanges ) {
			onChange( { url: editUrl } );
		}
		setOpen( false );
	};

	return (
		<ToolbarOverlay
			popoverFactory={ ( ref ) => (
				<SuggestionsPopover
					url={ url }
					inputValue={ editUrl }
					close={ () => setOpen( false ) }
					onSelect={ ( data ) => onChange( data ) }
					label={ label }
					ref={ ref }
				/>
			) }
			close={ () => setOpen( false ) }
			isOpen={ isOpen }
		>
			{ /* @TODO use URLInput? */ }
			<ToolbarGroup className="navigation-link-edit__toolbar-link-input-group">
				<ToolbarItem ref={ inputRef }>
					{ ( toolbarItemProps ) => (
						<input
							{ ...toolbarItemProps }
							type="text"
							placeholder={ 'Link address' }
							className="navigation-link-edit__toolbar-link-input"
							value={ editUrl }
							onChange={ ( e ) => {
								setEditUrl( e.currentTarget.value );
							} }
							onKeyDown={ ( e ) => {
								if ( e.which === 13 ) {
									finishLinkEditing( true );
								}
								if ( e.which === 27 ) {
									finishLinkEditing( false );
								}
							} }
							onKeyUp={ () => {} }
						/>
					) }
				</ToolbarItem>
				<ToolbarButton
					name="new-window"
					icon={ externalIcon }
					title={ __( 'Opens in new window' ) }
					className={ opensInNewTab ? 'is-active' : '' }
					onClick={ () => {
						onChange( {
							opensInNewTab: ! opensInNewTab,
						} );
					} }
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton
					name="done"
					title={ __( 'Done' ) }
					onClick={ () => finishLinkEditing( true ) }
					className="navigation-link-edit-link-done"
				>
					Done
				</ToolbarButton>
			</ToolbarGroup>
		</ToolbarOverlay>
	);
}
