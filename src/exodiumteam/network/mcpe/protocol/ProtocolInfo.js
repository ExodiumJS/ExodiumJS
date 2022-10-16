/**********************************************************\
 *                                                        *
 *   _____               _ _                     _ ____   *
 *  | ____|_  _____   __| (_)_   _ _ __ ___     | / ___|  *
 *  |  _| \ \/ / _ \ / _` | | | | | '_ ` _ \ _  | \___ \  *
 *  | |___ >  < (_) | (_| | | |_| | | | | | | |_| |___) | *
 *  |_____/_/\_\___/ \__,_|_|\__,_|_| |_| |_|\___/|____/  *
 *                                                        *
 *          This file is licensed under the GNU           *
 *          General Public License 3. To use or           *
 *          modify it you must accept the terms           *
 *          of the license.                               *
 *              ___________________________               *
 *              \ @author ExodiumJS Team /                *
 \**********************************************************/

class ProtocolInfo {
	/** Minecraft protocol */
	static CURRENT_PROTOCOL = 554;
	/** the display version will be showed */
	static MINECRAFT_VERSION ="1.19.30";
	/** packet ids */
	static GAME_PACKET = 0xfe;
	static LOGIN_PACKET = 0x01;
	static PLAY_STATUS_PACKET = 0x02;
	static SERVER_TO_CLIENT_HANDSHAKE_PACKET = 0x03;
	static CLIENT_TO_SERVER_HANDSHAKE_PACKET = 0x04;
	static DISCONNECT_PACKET = 0x05;
	static RESOURCE_PACKS_INFO_PACKET = 0x06;
	static RESOURCE_PACK_STACK_PACKET = 0x07;
	static RESOURCE_PACK_CLIENT_RESPONSE_PACKET = 0x08;
	static TEXT_PACKET = 0x09;
	static SET_TIME_PACKET = 0x0a;
	static START_GAME_PACKET = 0x0b;
	static ADD_PLAYER_PACKET = 0X0c;
	static ADD_ENTITY_PACKET = 0x0d;
	static REMOVE_ENTITY_PACKET = 0x0e;
	static ADD_ITEM_ENTITY_PACKET = 0x0f;
	static ACTOR_EVENT_PACKET = 0x1b;
	static PLAYER_SKIN = 0x5d;
	static TAKE_ITEM_ENTITY = 0x11;
	static MOVE_ENTITY_PACKET = 0x12;
	static MOVE_PLAYER_PACKET = 0x13;
	static RIDER_JUMP_PACKET = 0x14;
	static UPDATE_BLOCK_PACKET = 0x15;
	static ADD_PAINTING_PACKET = 0x16;
	static LEVEL_SOUND_OLD_PACKET = 0x18;
	static LEVEL_EVENT_PACKET = 0x19;
	static BIOME_DEFINITION_LIST_PACKET = 0x7a;
	static CREATIVE_CONTENT_PACKET = 0x91;
	static SET_TITLE_PACKET = 0x58;
	static PLAYER_SKIN_PACKET = 0x5d;
	static SET_LOCAL_PLAYER_AS_INITIALIZED_PACKET = 0x71;
	static AVAILABLE_ACTOR_IDENTIFIERS_PACKET = 0x77;
	static LEVEL_CHUNK_PACKET = 0x3a;
	static AVAILABLE_COMMANDS_PACKET = 0x4d;
	static TOAST_REQUEST_PACKET = 0xba;
	static MODAL_FORM_REQUEST_PACKET = 0x64;
	static MODAL_FORM_RESPONSE_PACKET = 0x65;
	static LEVEL_SOUND_EVENT_V2_PACKET = 0x78;
	static TRANSFER_PACKET = 0x55;
	static TICK_SYNC_PACKET = 0x17;
	static REQUEST_CHUNK_RADIUS_PACKET = 0x45;
	static CLIENT_CACHE_STATUS_PACKET = 0x81;
	static REQUEST_NETWORK_SETTINGS_PACKET = 0xc1;
	static SERVER_STATS_PACKET = 0xc0;
	static NETWORK_SETTINGS_PACKET = 0x8f;
}

module.exports = ProtocolInfo;
