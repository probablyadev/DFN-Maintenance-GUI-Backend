# DFN CONFIG HANDLER - Manages interactions with the configuration file.
# (C) Copyright 2017 Martin Towner/Ben Hartig/Desert Fireball Network
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# This file is part of the Desert Fireball Network camera control system.

# Operation:

# Requirements:

# Dependencies:

# Notes:

# Imports from external.
import os
import logging
import sys
import copy
import time
import datetime


def build_default():
	""" Build a default dictionary from hard-coded defaults. """

	def_conf_dict = {}
	def_conf_dict['station'] = { 'location':'test_lab',
		'lat':'-32.0', 'lon':'115.9','altitude':'0.0' }
	def_conf_dict['camera'] = { 'still_camera':'Nikon_D810', 'still_ser_no':'00000',
		'still_lens':'Samyang_8mm_F3.5',
		'vid_camera':'BFLY-U3-23S6M-C', 'vid_ser_no':'00000000',
		'vid_lens':'Fujinon046', 'vid_format':'PAL',
		'exposure_mode': 'BULB', 'exposure_period':'30', 'camera_fstop':'1',
		'camera_exposuretime':'53',
		'camera_iso':'21',
		'camera_quality':'4'}
	def_conf_dict['link'] = { 'dfnserver':'10.1.16.1', 'server_username':'dfn-user',
		'server_path':r'/home/data', 'private_keyfile':r'/root/.ssh/id_rsa',
		'local_contact_email':r'guest@nospam.com',
		'local_contact_name':'John_Doe',
		'owner_emails' : '0'}
	def_conf_dict['internal'] = { 'data_directory':r'/data0',
		'cloud_status_file':r'/tmp/dfn_cloud_status',
		'last_img_status_file':r'/tmp/dfn_last_image',
		'cloudy_img_file':r'/tmp/cloudy_img',
		'clearing_quality': '2',
		'storage_directory':r'data1', 'home_drive': 'c',
		'sun_leeway':'0', 'twilight_horizon':'-6',
		'histo_cloud_threshold': '500.0',
		'video_centre_x': '262', 'video_centre_y': '360',
		'video_radius': '255',
		'still_half_lens_fov':'90', 'still_centre_x':'3680',
		'north_xy_version':'-1',
		'still_centre_y':'2456', 'still_radius':'2900',
		'still_north_x':'3680', 'still_north_y':'4500',
		'still_astrometry_porder':'3',
		'still_astrometry_parx':'2.78725441,-119.22651621,4.32879270,-0.00035952,0.00084520,0.00126428,0.00000136,-0.00000003,0.00000138,-0.00000006,99999.87230129,99999.80926502,-99999.80923644,-0.01234232',
		'still_astrometry_pary':'0.46523414,-4.26195731,-119.20129388,-0.00060511,-0.00161696,0.00024635,0.00000004,0.00000136,0.00000006,0.00000137,99999.80928261,0.00778203,0.01081991,0.00276447',
		'still_astrometry_epoch':'2457130.35708',
		'still_astrometry_long':'128.115025',
		'still_astrometry_lat':'-30.85809',
		'still_astrometry_alt':'154.0'}
	def_conf_dict['clouds'] = { 'debug':'0', 'verbose':'0',
		'input':'/tmp/clouds_cover_check.pnm',
		'output':'/tmp/clouds_output_stars_marked.pnm',
		'mask':'/usr/local/etc/dfn/clouds_mask_920x614.pnm',
		'txt_input':'/tmp/dfn_last_image',
		'txt_output':'/tmp/dfn_cloud_status',
		'clouds_to_start_exp':'85',
		'time_to_start_exp':'60',
		'clouds_to_stop_exp':'90',
		'time_to_stop_exp':'300',
		'clear_sky_num_stars':'380',
		'xsig':'3.5',
		'shumin':'4.0',
		'lsig':'1',
		'll':'3',
		'pmin':'5.0',
		'pmax':'79.0',
		'cpmax':'2.0',
		'lon':'3',
		'lwmax':'3',}
	def_conf_dict['event_detect'] = { 'enabled':1, 'boxsize':300,
		'pix_threshold':40,
		'box_threshold':230,
		'box_threshold_blur':200,
		'medianb_ksize':5,
		'thresh_thresh':35,
		'thresh_maxvalue':1,
		'thresh_offset':10,
		'houghp_rho':1.0,
		'houghp_theta':2.0,
		'houghp_thresh':5,
		'houghp_minlinelength':14,
		'houghp_maxlinegap':5,
		'brightness_stdev_thresh':11,
		'line_length_min':12,
		'blob_ratio':3,
		'moon_radius':0.5 }
	def_conf_dict['firmware_control'] = { 'heater_enabled':1,
										  'heater_temperature_C': 25 }
	def_conf_dict['capture_control'] = { 'cloudiness_enabled':'Y',
										 'calibration_enabled':'Y',
										 'processing_enabled' : 'Y',
										 'tether_enabled' : 'N',
										 'video_enabled' : 'Y',
										 'calibration_interval':30,
										 'calibration_offset':0,
										 'log_debug_enabled':'N',
										 'time_checking_clear':15,
										 'time_checking_clearing':1,
										 'time_checking_cloudy':5,
										 'twilight_offset':15,
										 'remove_dirs_enabled':'N'}

	return def_conf_dict

def load_config(stationfilename):
	""" Load the system cfg file, using hard-coded defaults if values are
		missing, return as a double layer dict. Support older formats where
		keys where in different sub-groups. Supports py2 and 3. """

	logger = logging.getLogger()

	def_conf_dict = build_default()

	if (os.path.isfile(stationfilename) and
								os.path.getsize(stationfilename) != 0):
		if sys.version_info[0] == 3:
			import configparser
			conf = configparser.ConfigParser(allow_no_value=True)
			conf.read(stationfilename)
			conf_dict = {} #copy to a real dict for easier manipulation
			for grp in conf:
				conf_dict[grp]={}
				for item in conf[grp]:
					conf_dict[grp][item] = conf[grp][item]
		elif sys.version_info[0] == 2:
			import ConfigParser
			class MyParser(ConfigParser.ConfigParser):
				def as_dict(self):
					d = dict(self._sections)
					for k in d:
						d[k] = dict(self._defaults, **d[k])
						d[k].pop('__name__', None)
					return d
			if sys.version_info[1] == 7:
				config = MyParser(allow_no_value=True)
			else:
				config = MyParser()
			config.read(stationfilename)
			conf_dict = config.as_dict()
		else:
			if len(logger.handlers) != 0:
				logger.critical('old_python')
			else:
				print('old_python')

		if conf_dict == {}:
			if len(logger.handlers) != 0:
				logger.warning('WARNING empty_config, ' + stationfilename)
			else:
				print('WARNING empty_config, ' + stationfilename)

		if not 'internal' in conf_dict:
			conf_dict['internal'] = {}

		# move all the correct items to internal, delete from original position
		for item in ('cloud_status_file', 'last_img_status_file' , 'cloudy_img_file',
			'histo_cloud_threshold', 'data_directory', 'storage_directory',
			'home_drive'):
			if item in conf_dict['station']:
				conf_dict['internal'][item] = conf_dict['station'].pop(item)

		if 'internal' in conf_dict and 'data_directory' in conf_dict['internal']:
			if not conf_dict['internal']['data_directory'].startswith(os.sep):
				conf_dict['internal']['data_directory'] = os.sep + conf_dict['internal']['data_directory']

		for item in ('sun_leeway', 'twilight_horizon', 'still_half_lens_fov',
					'still_centre_x', 'still_centre_y', 'still_radius',
					'video_centre_x', 'video_centre_y', 'video_radius'):
			if item in conf_dict['camera']:
				conf_dict['internal'][item] = conf_dict['camera'].pop(item)

		# new extra camera stuff
		if 'camera' in conf_dict and not 'vid_format' in conf_dict['camera']:
			conf_dict['camera']['vid_format'] = def_conf_dict['camera']['vid_format']

		# new extra link stuff
		if 'link' in conf_dict:
			if not 'local_contact_email' in conf_dict['link']:
				conf_dict['link']['local_contact_email'] = def_conf_dict['link']['local_contact_email']
			if not 'local_contact_name' in conf_dict['link']:
				conf_dict['link']['local_contact_name'] = def_conf_dict['link']['local_contact_name']

		# new extra internal stuff
		for group in conf_dict.copy():
			if 'still_north_x'in conf_dict[group]:
					conf_dict['internal']['still_north_x'] = conf_dict[group].pop('still_north_x')
					conf_dict['internal']['still_north_y'] = conf_dict[group].pop('still_north_y')

		if not 'north_xy_version' in conf_dict['internal']:
			if 'still_north_x' in conf_dict['internal']:
				if (conf_dict['internal']['still_north_x'] == def_conf_dict['internal']['still_north_x']
				and conf_dict['internal']['still_north_y'] == def_conf_dict['internal']['still_north_y']):
					conf_dict['internal']['north_xy_version'] = def_conf_dict['internal']['north_xy_version'] #default value
				else:
					conf_dict['internal']['north_xy_version'] = '0' #some manually set value

		if not 'still_north_x' in conf_dict['internal']:
			conf_dict['internal']['still_north_x'] = def_conf_dict['internal']['still_north_x']
			conf_dict['internal']['still_north_y'] = def_conf_dict['internal']['still_north_y']
			conf_dict['internal']['north_xy_version'] = def_conf_dict['internal']['north_xy_version']

		if not 'video_centre_x' in conf_dict['internal']:
			conf_dict['internal']['video_centre_x'] = def_conf_dict['internal']['video_centre_x']
			conf_dict['internal']['video_centre_y'] = def_conf_dict['internal']['video_centre_y']
			conf_dict['internal']['video_radius'] = def_conf_dict['internal']['video_radius']

		#keep clouds as is
		#event detection
		if not 'event_detect' in conf_dict:
			conf_dict['event_detect'] = {}
			for item in def_conf_dict['event_detect']:
				conf_dict['event_detect'][item] = def_conf_dict['event_detect'][item]
		else: #event_detect exists, but check/copy over later added keys
			if not 'moon_radius' in conf_dict['event_detect']:
				conf_dict['event_detect']['moon_radius'] = def_conf_dict['event_detect']['moon_radius']

		#firmware control
		if not 'firmware_control' in conf_dict:
			conf_dict['firmware_control'] = {}
			for item in def_conf_dict['firmware_control']:
				conf_dict['firmware_control'][item] = def_conf_dict['firmware_control'][item]

		#capture control
		if not 'capture_control' in conf_dict:
			conf_dict['capture_control'] = {}
			for item in def_conf_dict['capture_control']:
				conf_dict['capture_control'][item] = def_conf_dict['capture_control'][item]
		else:
			for item in def_conf_dict['capture_control']:
				if not item in conf_dict['capture_control']:
					conf_dict['capture_control'][item] = def_conf_dict['capture_control'][item]

		for item in ('time_checking_cloudy', 'time_checking_clearing', 'time_checking_clear'):
			if item in conf_dict['clouds']:
				conf_dict['capture_control'][item] = conf_dict['clouds'].pop(item)

		if 'log_level' in conf_dict['capture_control']:
			conf_dict['capture_control'].pop('log_level')

	else: # missing config or 0 size
		if len(logger.handlers) != 0:
			logger.warning('missing_config_default_used, ' + stationfilename)
		else:
			print('WARNING missing_config_default_used, ' + stationfilename)
		conf_dict = copy.deepcopy(def_conf_dict)

	logger.debug('tidying_up_keys')
	# tidy up name, hostname, location
	if not 'hostname' in conf_dict['station']:
		if 'name' in conf_dict['station']:
			conf_dict['station']['hostname'] = conf_dict['station'].pop('name')
		else:
			conf_dict['station']['hostname'] = 'PLACEHOLDER'
	# tidy up event section to floats/ints
	for item in conf_dict['event_detect']:
		try:
			conf_dict['event_detect'][item] = float(conf_dict['event_detect'][item])
			if int(conf_dict['event_detect'][item]) == conf_dict['event_detect'][item]:
				conf_dict['event_detect'][item] = int(conf_dict['event_detect'][item])
		except ValueError as e:
			logger.warning('event_detect_type_error, ' +
							str(conf_dict['event_detect'][item]))
	# sort out time
	#if 'time' in conf_dict['internal']:
	#    conf_dict['internal']['currenttime'] = conf_dict['internal'].pop('time')
	if not 'currenttime' in conf_dict['internal']:
		conf_dict['internal']['currenttime'] = time.time()
	#old vpn address
	if conf_dict['link']['dfnserver'] == '10.1.1.1':
		conf_dict['link']['dfnserver'] = '10.1.16.1'
	# tidy up postion altitude to castable string, remove 'm'
	if conf_dict['station']['altitude'].lower().endswith('m'):
		conf_dict['station']['altitude'] = conf_dict['station']['altitude'].rstrip('mM')

	# copy over any missing defaults into config_dict
	for group in def_conf_dict:
		if not group in conf_dict:
			conf_dict[group] = {}
		for item in def_conf_dict[group]:
			if not item in conf_dict[group]:
				conf_dict[group][item] = def_conf_dict[group][item]
				if len(logger.handlers) != 0:
					logger.debug('missing_config_default_item_inserted, '
									+ str(group) + ', ' + str(item) + ', '
									+ str(conf_dict[group][item]))
				# else:
					# print('DEBUG missing_config_default_item_inserted, '
									# + str(group) + ', ' + str(item) + ', '
									# + str(conf_dict[group][item]))

	return conf_dict

def save_config_file(fname, conf_dict):
	"""build new config file from a double layer dict, and
	save to a standard ini file format. support py2 and 3"""

	logger = logging.getLogger()

	if sys.version_info.major == 2:
		import ConfigParser
		new_conf = ConfigParser.ConfigParser()
		for sec in conf_dict:
			new_conf.add_section(sec)
			for item in conf_dict[sec]:
				new_conf.set(sec, item, conf_dict[sec][item])
	elif sys.version_info.major == 3:
		import configparser
		new_conf = configparser.ConfigParser()
		for sec in conf_dict:
			new_conf[str(sec)] = {}
			for item in conf_dict[str(sec)]:
				dummy = conf_dict[str(sec)][str(item)]
				new_conf[str(sec)][str(item)] = str(dummy)
	else:
		print('odd python')
		logger.warning('odd python')

	if os.path.exists(fname):
		try:
			os.rename(fname, fname + '.' + datetime.datetime.now().strftime('%s'))
		except OSError as e:
			logger.warning('Failed_to_bkp_config_file, '+ fname + ', ' + str(e))

	try:
		with open(fname, 'wt') as configfile:
			new_conf.write(configfile)
	except IOError:
		logger.warning('Failed_to_save_config_file, '+ fname)
		return False
	else:
		logger.debug('Saved_config_file, '+ fname)
		return True
