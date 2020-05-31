<?php

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Theme\ThemeSettings;
use Drupal\system\Form\ThemeSettingsForm;
use Drupal\Core\Form;

/**
 * Implements form_system_theme_settings_alter().
 */
function proboci_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  // Add options for the login page headline as well as the login page introduction
  $form['proboci_settings']['login']['login_page_headline'] = array(
    '#type' => 'textfield',
    '#title' => t('Login Page Headline'),
    '#description' => t('This is the headline which appears above the description of the login form.'),
    '#default_value' => theme_get_setting('login_page_headline', 'proboci'),
  );
  $form['proboci_settings']['login']['login_page_introduction'] = array(
    '#type' => 'textarea',
    '#title' => t('Login Page Introduction'),
    '#description' => t('A page introducing the web site login form.'),
    '#default_value' => theme_get_setting('login_page_introduction', 'proboci'),
  );
}
